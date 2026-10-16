import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CloudSun({ size = 24, ...props }: IconProps) {
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
      <path d="M10 22L19 22C20.6569 22 22 20.6569 22 19C22 17.3431 20.6569 16 19 16C19 13.5147 16.9853 11.5 14.5 11.5C12.0147 11.5 10 13.5147 10 16C8.3431 16 7 17.3431 7 19C7 20.6569 8.3431 22 10 22ZM7.6787 10.9281C7.5606 10.6329 7.5 10.3179 7.5 10C7.5 8.6193 8.6193 7.5 10 7.5C10.5583 7.5 11.1004 7.6868 11.5402 8.0308M3.5 10L2 10M5.4038 5.4038L4.3431 4.3431M10 3.5L10 2M14.5962 5.4038L15.6569 4.3431"/>
    </svg>
  )
}
