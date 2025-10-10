import { Box } from "lucide-react";
import { cn } from "@/lib/utils";
import { DeliveryStatus, PerformanceMetric, Task } from "@/types/dashboard";

export function DeliveryCard({ deliveries }: { deliveries: DeliveryStatus[] }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Orders
      </h2>
      <div className="space-y-4">
        {deliveries.map((delivery) => (
          <div
            key={delivery.id}
            className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0">
              <Box className="h-8 w-8 text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {delivery.title}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {delivery.destination}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span
                className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                  delivery.status === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : delivery.status === "In Transit"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
                )}
              >
                {delivery.status}
              </span>
              <span className="text-xs text-gray-500 mt-1">{delivery.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MetricsCard({ metrics }: { metrics: PerformanceMetric[] }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Performance Metrics
      </h2>
      <div className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                {metric.label}
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {metric.value}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={cn("h-2 rounded-full", metric.color)}
                style={{ width: `${metric.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TasksCard({ tasks }: { tasks: Task[] }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Tasks</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0">
              <div
                className={cn(
                  "h-3 w-3 rounded-full",
                  task.priority === "high"
                    ? "bg-red-500"
                    : task.priority === "medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                )}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {task.title}
              </p>
              <p className="text-xs text-gray-500">{task.time}</p>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}