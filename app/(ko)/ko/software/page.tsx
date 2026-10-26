import { SoftwarePage, softwareMetadata } from "../../../_pages/software";

export const metadata = softwareMetadata("ko");

export default function Page() {
  return <SoftwarePage locale="ko" />;
}
