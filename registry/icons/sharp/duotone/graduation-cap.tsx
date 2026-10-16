import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GraduationCap({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6 10.6L6 16.7901C7.6737 18.2165 9.8009 19 12 19C14.1991 19 16.3263 18.2165 18 16.7901L18 10.6M2 9L2 16" strokeOpacity="0.4"/>
      <path d="M12.3714 4.0715L22.3714 8.0715C22.751 8.2234 23 8.5911 23 9C23 9.4089 22.751 9.7766 22.3714 9.9285L12.3714 13.9285C12.2533 13.9757 12.1272 14 12 14C11.8728 14 11.7467 13.9757 11.6286 13.9285L1.6286 9.9285C1.249 9.7766 1 9.4089 1 9C1 8.5911 1.249 8.2234 1.6286 8.0715L11.6286 4.0715C11.7467 4.0243 11.8728 4 12 4C12.1272 4 12.2533 4.0243 12.3714 4.0715Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
