import { useState } from "react";
import Head from "next/head";
import { PROPERTYLISTINGSAMPLE, FILTER_OPTIONS } from "@/constants";
import PropertyCard from "@/components/PropertyCard";
import Pill from "@/components/Pill";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [filteredProperties, setFilteredProperties] = useState(
    PROPERTYLISTINGSAMPLE
  );

  const handleFilterClick = (filter: string) => {
    if (activeFilter === filter) {
      // If clicking the same filter, reset to show all
      setActiveFilter("");
      setFilteredProperties(PROPERTYLISTINGSAMPLE);
    } else {
      // Apply new filter
      setActiveFilter(filter);
      const filtered = PROPERTYLISTINGSAMPLE.filter((property) =>
        property.category.some((cat) =>
          cat.toLowerCase().includes(filter.toLowerCase())
        )
      );
      setFilteredProperties(filtered);
    }
  };

  return (
    <>
      <Head>
        <title>StayScape - Find Your Perfect Place</title>
        <meta
          name="description"
          content="Find your favorite place here! The best prices for over 2 million properties worldwide."
        />
      </Head>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[500px] bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=600&fit=crop')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Hero Content */}
          <div className="relative z-10 text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find your favorite place here!
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              The best prices for over 2 million properties worldwide.
            </p>

            {/* Hero Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-full p-2 shadow-lg">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    className="flex-1 px-6 py-3 text-gray-700 bg-transparent focus:outline-none text-lg"
                  />
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors font-medium">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Filter by Category
              </h2>
              <span className="text-gray-600">
                {filteredProperties.length} properties found
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-3 mb-4">
              {FILTER_OPTIONS.map((filter) => (
                <Pill
                  key={filter}
                  label={filter}
                  isActive={activeFilter === filter}
                  onClick={() => handleFilterClick(filter)}
                />
              ))}
            </div>

            {/* Clear Filter Button */}
            {activeFilter && (
              <button
                onClick={() => {
                  setActiveFilter("");
                  setFilteredProperties(PROPERTYLISTINGSAMPLE);
                }}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </section>

        {/* Listings Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {activeFilter
                  ? `${activeFilter} Properties`
                  : "Popular Destinations"}
              </h2>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Sort by:</span>
                <select className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating: High to Low</option>
                  <option>Most Popular</option>
                </select>
              </div>
            </div>

            {/* Property Grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProperties.map((property, index) => (
                  <PropertyCard key={index} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-16 w-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m11 0v-5a2 2 0 00-2-2h-2a2 2 0 00-2 2v5m-4 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search criteria.
                </p>
              </div>
            )}

            {/* Load More Button */}
            {filteredProperties.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  Load More Properties
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
