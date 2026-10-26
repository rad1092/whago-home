import { ProductPage, productMetadata, productParams } from "../../../../_pages/product";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return productParams();
}

export async function generateMetadata({ params }: Props) {
  return productMetadata("ko", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <ProductPage locale="ko" slug={(await params).slug} />;
}
