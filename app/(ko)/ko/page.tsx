import { HomePage, homeMetadata } from "../../_pages/home";

export const metadata = homeMetadata("ko");

export default function Page() {
  return <HomePage locale="ko" />;
}
