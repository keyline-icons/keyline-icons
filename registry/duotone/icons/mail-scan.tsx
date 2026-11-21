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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 14H3C2.4477 14 2 13.5523 2 13V6C2 3.7909 3.7909 2 6 2H18C20.2091 2 22 3.7909 22 6V13C22 13.5523 21.5523 14 21 14Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 6L11.36361 8.84948C11.74386 9.05015 12.25614 9.05015 12.63639 8.84948L21 6M2 13H22"/>
      <path d="M3 17H10M21 17H14M20 21H18M14 21H10M6 21H4" strokeOpacity="0.4"/>
    </svg>
  )
}
