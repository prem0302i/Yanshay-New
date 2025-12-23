import Hero from '@/components/layout/Hero';

const HomePage = () => {
  return (
    <>
      <Hero />
      <div className="container mx-auto py-16">
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Placeholder for Product Cards */}
            <div className="border rounded-lg p-4 text-center">
              <div className="bg-muted h-48 mb-4"></div>
              <h3 className="font-bold">Product Name</h3>
              <p className="text-muted-foreground">₹29.99</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="bg-muted h-48 mb-4"></div>
              <h3 className="font-bold">Product Name</h3>
              <p className="text-muted-foreground">₹29.99</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="bg-muted h-48 mb-4"></div>
              <h3 className="font-bold">Product Name</h3>
              <p className="text-muted-foreground">₹29.99</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="bg-muted h-48 mb-4"></div>
              <h3 className="font-bold">Product Name</h3>
              <p className="text-muted-foreground">₹29.99</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
