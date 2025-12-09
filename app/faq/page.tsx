const FAQPage = () => {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
      <div className="space-y-4 max-w-3xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold">What is your return policy?</h2>
          <p className="text-muted-foreground">We accept returns within 30 days of purchase. Please contact us for more information.</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">How long does shipping take?</h2>
          <p className="text-muted-foreground">Shipping usually takes 5-7 business days.</p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
