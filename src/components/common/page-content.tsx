'use client'
import { usePathname } from "next/navigation";
import {siteConfig} from "@/config/site.config";
import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';

export default function PageContent() {

    const pathname = usePathname();

    const PageContent = siteConfig.pagesContent[pathname as keyof typeof siteConfig.pagesContent];

    const cleanHTML = DOMPurify.sanitize(PageContent.content);

  return (
    <div>{parse(cleanHTML)}</div>
  )
}
