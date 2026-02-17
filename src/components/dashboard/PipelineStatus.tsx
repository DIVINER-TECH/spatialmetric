import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

const PIPELINE_FUNCTIONS = ["ingest-news", "daily-market-snapshot", "auto-content", "daily-pipeline"];

type FunctionRun = {
  function_name: string;
  status: string;
  created_at: string;
  duration_ms: number | null;
};

const usePipelineStatus = () =>
  useQuery({
    queryKey: ["pipelineStatus"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("function_runs")
        .select("function_name,status,created_at,duration_ms")
        .in("function_name", PIPELINE_FUNCTIONS)
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;

      const latest: Record<string, FunctionRun> = {};
      (data ?? []).forEach((row) => {
        if (!latest[row.function_name]) {
          latest[row.function_name] = row as FunctionRun;
        }
      });
      return latest;
    },
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 2,
  });

const getHealthColor = (run?: FunctionRun) => {
  if (!run) return "text-muted-foreground";
  const hoursAgo = (Date.now() - new Date(run.created_at).getTime()) / (1000 * 60 * 60);
  if (run.status === "failure") return "text-destructive";
  if (hoursAgo < 24) return "text-success";
  if (hoursAgo < 48) return "text-warning";
  return "text-destructive";
};

const HealthIcon = ({ run }: { run?: FunctionRun }) => {
  const color = getHealthColor(run);
  if (!run) return <XCircle className={`h-4 w-4 ${color}`} />;
  const hoursAgo = (Date.now() - new Date(run.created_at).getTime()) / (1000 * 60 * 60);
  if (run.status === "failure" || hoursAgo >= 48) return <XCircle className={`h-4 w-4 ${color}`} />;
  if (hoursAgo >= 24) return <AlertTriangle className={`h-4 w-4 ${color}`} />;
  return <CheckCircle className={`h-4 w-4 ${color}`} />;
};

export function PipelineStatus() {
  const { data: runs } = usePipelineStatus();
  const queryClient = useQueryClient();
  const [running, setRunning] = useState(false);

  const triggerPipeline = useMutation({
    mutationFn: async () => {
      setRunning(true);
      const { data, error } = await supabase.functions.invoke("daily-pipeline", {
        body: { triggered_by: "manual" },
      });
      if (error) throw error;
      return data;
    },
    onSettled: () => {
      setRunning(false);
      setTimeout(() => queryClient.invalidateQueries({ queryKey: ["pipelineStatus"] }), 3000);
    },
  });

  return (
    <Card className="bg-card/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Pipeline Status</CardTitle>
          <Button
            size="sm"
            variant="outline"
            onClick={() => triggerPipeline.mutate()}
            disabled={running}
            className="gap-2"
          >
            <RefreshCw className={`h-3 w-3 ${running ? "animate-spin" : ""}`} />
            {running ? "Running…" : "Run Now"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {PIPELINE_FUNCTIONS.map((fn) => {
            const run = runs?.[fn];
            return (
              <div key={fn} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HealthIcon run={run} />
                  <span className="text-sm font-mono">{fn}</span>
                </div>
                <div className="flex items-center gap-2">
                  {run ? (
                    <>
                      <Badge variant="outline" className="text-xs">
                        {run.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(run.created_at), { addSuffix: true })}
                      </span>
                    </>
                  ) : (
                    <span className="text-xs text-muted-foreground">Never run</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
