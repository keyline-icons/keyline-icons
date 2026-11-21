import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MailScan({ size = 24, ...props }: IconProps) {
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
      <path d="M12 14H3C2.4477 14 2 13.5523 2 13V3C2 2.4477 2.4477 2 3 2H21C21.5523 2 22 2.4477 22 3V13C22 13.5523 21.5523 14 21 14Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2.3225 5.7692L3 6L11.36361 8.84948C11.74386 9.05015 12.25614 9.05015 12.63639 8.84948L21 6L21.6775 5.7692M1 13H23"/>
      <path d="M2 17H11M22 17H13M21 21H17M15 21H9M7 21H3" strokeOpacity="0.4"/>
    </svg>
  )
}
