import React from "react";
import Layout from "./Layout";

const Dashboard = () => {
  return (
    <>
      <Layout>
        <div className="flex min-h-[100%] bg-gray-200 text-gray-800">
          {/* Sidebar */}
          {/* <aside className="w-16 bg-gray-800 text-white p-4 space-y-6">
            <div className="rounded-full w-10 h-10 bg-gray-400"></div>
            <nav className="flex flex-col space-y-4">
              <div className="w-8 h-8 bg-gray-600 rounded"></div>
              <div className="w-8 h-8 bg-gray-600 rounded"></div>
              <div className="w-8 h-8 bg-gray-600 rounded"></div>
              <div className="w-8 h-8 bg-gray-600 rounded"></div>
            </nav>
          </aside> */}

          {/* Main Content */}
          <main className="flex-grow p-8 grid grid-cols-3 gap-8">
            {/* Statistics Section */}
            <section className="col-span-2 bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Your Statistic</h2>
              <div className="grid grid-cols-3 gap-4">
                {/* Today's Plan */}
                <div className="col-span-1 bg-gray-100 p-4 rounded shadow">
                  <h3 className="text-sm font-medium">Today's plan</h3>
                  <p className="text-2xl font-bold">5/10</p>
                  <p className="text-sm text-gray-500">goals completed</p>
                </div>

                {/* Calories */}
                <div className="col-span-1 bg-gray-100 p-4 rounded shadow">
                  <h3 className="text-sm font-medium">Calories</h3>
                  <p className="text-2xl font-bold">460 kcal</p>
                </div>

                {/* Heart Rate */}
                <div className="col-span-1 bg-gray-100 p-4 rounded shadow">
                  <h3 className="text-sm font-medium">Heart Rate</h3>
                  <p className="text-2xl font-bold">78 bpm</p>
                </div>
              </div>

              {/* Activity Breakdown */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Activity breakdown</h3>
                <div className="space-y-2">
                  <div className="bg-gray-200 rounded-full h-3 w-full relative">
                    <div
                      className="absolute bg-green-500 h-3 rounded-full"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3 w-full relative">
                    <div
                      className="absolute bg-red-500 h-3 rounded-full"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3 w-full relative">
                    <div
                      className="absolute bg-blue-500 h-3 rounded-full"
                      style={{ width: "30%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Profile Section */}
            <section className="col-span-1 bg-white p-6 rounded-lg shadow">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-400"></div>
                <div>
                  <h3 className="text-lg font-medium">Alex Bennett</h3>
                  <p className="text-sm text-gray-500">Profile info here</p>
                </div>
              </div>
              {/* Additional profile info */}
              <div className="mt-4 text-sm">
                <p>Height: 180 cm</p>
                <p>Weight: 65 kg</p>
                <p>Age: 24</p>
              </div>
            </section>
          </main>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
