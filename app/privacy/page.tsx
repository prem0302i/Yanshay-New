import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-6 py-24 max-w-4xl">
      <div className="mb-16 border-b border-border pb-10">
        <h1 className="text-4xl md:text-6xl font-display uppercase tracking-tighter mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground font-medium tracking-widest uppercase text-xs">Last Updated: May 20, 2026</p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none font-sans space-y-12 text-foreground/80 leading-relaxed">
        
        <section>
          <p className="text-lg">
            Welcome to YANSHAY. Your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website, place an order, or interact with our services.
          </p>
          <p className="mt-4">
            By using our website, you agree to the terms mentioned in this Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display uppercase tracking-tight text-foreground mb-6">1. Information We Collect</h2>
          <p className="mb-4">We may collect the following information from customers:</p>
          
          <div className="space-y-6 ml-4">
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase text-foreground mb-2">Personal Information</h3>
              <ul className="list-disc list-inside space-y-1 opacity-80">
                <li>Full Name</li>
                <li>Phone Number</li>
                <li>Email Address</li>
                <li>Shipping/Billing Address</li>
                <li>Payment Information</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase text-foreground mb-2">Order Information</h3>
              <ul className="list-disc list-inside space-y-1 opacity-80">
                <li>Product details</li>
                <li>Custom print designs uploaded by customers</li>
                <li>Order history</li>
                <li>Delivery preferences</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase text-foreground mb-2">Technical Information</h3>
              <ul className="list-disc list-inside space-y-1 opacity-80">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device information</li>
                <li>Website usage data through cookies or analytics tools</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-display uppercase tracking-tight text-foreground mb-6">2. How We Use Your Information</h2>
          <p className="mb-4">YANSHAY uses your information to:</p>
          <ul className="list-disc list-inside space-y-2 opacity-80 ml-4 mb-6">
            <li>Process and deliver orders</li>
            <li>Provide customer support</li>
            <li>Improve our products and services</li>
            <li>Send order updates and important notifications</li>
            <li>Prevent fraud and unauthorized activities</li>
            <li>Improve website performance and user experience</li>
          </ul>
          <p className="font-medium text-foreground">We do not sell or rent your personal information to third parties.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display uppercase tracking-tight text-foreground mb-6">3. Payment Security</h2>
          <p>
            All payments made on our website are processed through secure payment gateways. We do not store your complete card or banking details on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display uppercase tracking-tight text-foreground mb-6">4. Cookies and Tracking Technologies</h2>
          <p className="mb-4">Our website may use cookies and similar technologies to:</p>
          <ul className="list-disc list-inside space-y-2 opacity-80 ml-4 mb-6">
            <li>Remember customer preferences</li>
            <li>Improve website functionality</li>
            <li>Analyze website traffic and performance</li>
          </ul>
          <p>Users can disable cookies through their browser settings if preferred.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display uppercase tracking-tight text-foreground mb-6">5. Custom Design Content</h2>
          <p className="mb-4">Customers are responsible for the designs, logos, text, or images they upload for printing.</p>
          <p className="mb-4">YANSHAY reserves the right to reject designs that:</p>
          <ul className="list-disc list-inside space-y-2 opacity-80 ml-4">
            <li>Violate copyright or trademark laws</li>
            <li>Contain offensive or illegal content</li>
            <li>Promote hate, violence, or harmful activities</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display uppercase tracking-tight text-foreground mb-6">6. Sharing of Information</h2>
          <p className="mb-4">We may share limited customer information only with:</p>
          <ul className="list-disc list-inside space-y-2 opacity-80 ml-4 mb-6">
            <li>Delivery and logistics partners</li>
            <li>Payment processing providers</li>
            <li>Legal authorities if required by law</li>
          </ul>
          <p>We ensure that such third parties handle your information securely.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display uppercase tracking-tight text-foreground mb-6">7. Data Protection</h2>
          <p className="mb-4">
            We take reasonable security measures to protect your personal information from unauthorized access, misuse, or disclosure.
          </p>
          <p>
            However, no online platform can guarantee complete security, and users share information at their own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display uppercase tracking-tight text-foreground mb-6">8. Your Rights</h2>
          <p className="mb-4">Customers have the right to:</p>
          <ul className="list-disc list-inside space-y-2 opacity-80 ml-4 mb-6">
            <li>Access their personal data</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of personal data</li>
            <li>Opt out of promotional communications</li>
          </ul>
          <p>To request any changes, contact us using the details below.</p>
        </section>

        <section>
          <h2 className="text-2xl font-display uppercase tracking-tight text-foreground mb-6">9. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites or social media platforms. YANSHAY is not responsible for the privacy practices of those websites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display uppercase tracking-tight text-foreground mb-6">10. Changes to This Privacy Policy</h2>
          <p>
            YANSHAY may update this Privacy Policy from time to time. Updated versions will be posted on this page with the revised date.
          </p>
        </section>

        <section className="bg-card p-8 border border-border rounded-lg mt-16">
          <h2 className="text-2xl font-display uppercase tracking-tight text-foreground mb-6">11. Contact Us</h2>
          <p className="mb-6">If you have any questions regarding this Privacy Policy, you may contact us:</p>
          <div className="space-y-4 font-medium">
            <p className="flex items-center gap-4">
              <span className="text-[10px] tracking-widest uppercase opacity-50 w-24">Company</span>
              YANSHAY
            </p>
            <p className="flex items-center gap-4">
              <span className="text-[10px] tracking-widest uppercase opacity-50 w-24">Email</span>
              <a href="mailto:Yanshay.shop@gmail.com" className="text-primary hover:underline">Yanshay.shop@gmail.com</a>
            </p>
            <p className="flex items-center gap-4">
              <span className="text-[10px] tracking-widest uppercase opacity-50 w-24">Location</span>
              Chh. Sambhajinagar, Maharashtra, India
            </p>
          </div>
        </section>

        <div className="text-center pt-12 pb-8 opacity-50">
          <p className="text-sm font-medium tracking-widest uppercase">Thank you for trusting YANSHAY.</p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
