import Nav from "@components/Nav/Nav";
import "@styles/globals.css";
// import Provider from "@components/Provider";

export const metadata = {
  title: "AI Prompts",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang='en'>
    <body>

      <div className='main'>
        <div className='gradient' />
      </div>
      <main className='app'>
        <Nav />
        {children}
      </main>

    </body>
  </html>
);

export default RootLayout;