import { AboutPage, aboutMetadata } from "../../_pages/about";

export const metadata = aboutMetadata("en");

export default function Page() {
  return <AboutPage locale="en" />;
}
