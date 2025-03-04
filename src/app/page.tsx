import Header from './components/Header/header';

export default function Typography() {
  return (
    <>
      <Header />
      <div className="space-y-4 p-6">
        <h1 className="text-6xl font-bold tracking-tight">Hello Georgius!</h1>
        <h2 className="text-5xl font-semibold tracking-tight">
          Elegant Simplicity
        </h2>
        <h3 className="text-4xl font-medium tracking-normal">
          Aesthetic Precision
        </h3>
        <h4 className="text-3xl font-medium tracking-normal">
          Design with Purpose
        </h4>
        <h5 className="text-2xl font-medium tracking-wide">Subtle and Sharp</h5>
        <h6 className="text-xl font-medium tracking-wide">
          Harmony in Typography
        </h6>
        <p className="text-lg font-light leading-relaxed">
          The essence of typography lies in balance, contrast, and rhythm,
          forming a visual hierarchy that guides the eye effortlessly.
        </p>
      </div>
    </>
  );
}
