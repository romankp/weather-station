function App() {
  return (
    <div id="root">
      <h1>Weather Station</h1>
      <h2></h2>
      <app-section type="current">
        <h4 slot="section-content">
          HEADER TEST <span>Wow! So span!</span>
        </h4>
      </app-section>
      <app-section type="tides"></app-section>
      <app-section type="wind"></app-section>
    </div>
  );
}

export default App;
