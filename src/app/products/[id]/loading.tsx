export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="animate-pulse">
        {/* Breadcrumbs skeleton */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="flex space-x-2">
              <div className="w-16 h-16 bg-gray-200 rounded"></div>
              <div className="w-16 h-16 bg-gray-200 rounded"></div>
              <div className="w-16 h-16 bg-gray-200 rounded"></div>
            </div>
          </div>
          
          {/* Product info skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}