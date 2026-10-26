import { SoftwarePage, softwareMetadata } from "../../_pages/software";

export const metadata = softwareMetadata("en");

export default function Page() {
  return <SoftwarePage locale="en" />;
}
