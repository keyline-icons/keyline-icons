import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MailAsterisk({ size = 24, ...props }: IconProps) {
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
      <path d="M5 3H19C21.209 3 23 4.791 23 7V10C23 10.552 22.552 11 22 11H16C14.343 11 13 12.343 13 14V20C13 20.552 12.552 21 12 21H5C2.791 21 1 19.209 1 17V7C1 4.791 2.791 3 5 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 20H5C3.343 20 2 18.657 2 17V7M2 7C2 5.343 3.343 4 5 4H19C20.657 4 22 5.343 22 7M2 7L11.293 11C11.715 11.282 12.285 11.282 12.707 11L22 7M22 7V10M19 14V17M19 17V20M19 17L16.6 18.8M19 17L21.4 15.2M19 17L16.6 15.2M19 17L21.4 18.8"/>
    </svg>
  )
}
