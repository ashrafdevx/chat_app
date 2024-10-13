import "./App.css";

function App() {
  return (
    <div className="App">
      <div class="flex items-center">
        <div class="basis-1/4  sm:basis-1/4 text-xs sm:text-lg md:basis-1/2 sm:bg-red-900 bg-red-400">
          01
        </div>
        <div class="basis-full   sm:basis-1/4 text-xs sm:text-lg md:basis-1/2 bg-purple-200 sm:bg-purple-900">
          02
        </div>
        <div class="basis-full order-3 sm:basis-1/2 text-xs sm:text-lg md:basis-full bg-green-200 sm:bg-green-900 ">
          03
        </div>
      </div>
      {/* wrap */}
      <div class="flex flex-nowrap mt-6">
        <div className="basis-1/4 bg-red-400">01</div>
        <div className="basis-1/4 bg-teal-300">02</div>
        <div className="basis-full bg-violet-600">03</div>
      </div>
      {/* wrap */}
      <div class="flex flex-wrap mt-6 ">
        <div className="basis-1/4 bg-red-400 sm:basis-1/2">
          <img
            src="/images/a.webp"
            className="h-32 sm:h-64 w-full object-cover"
            alt="sss"
          />{" "}
          <img
            src="/images/a.webp"
            className="h-14 w-14 sm:h-64 w-full object-cover"
            alt="sss"
          />
        </div>
        <div className="basis-1/4 bg-teal-300 sm:basis-1/2">02</div>
        <div className="basis-1/2 bg-violet-600 sm:basis-full">03</div>
      </div>
    </div>
  );
}

export default App;
