import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PlugZap({ size = 24, ...props }: IconProps) {
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
      <path d="M7.6569 13.5147L10.0139 11.1577M10.4853 16.3431L12.8423 13.9861M3.8856 20.1144L2 22" fill="none" strokeOpacity="0.4"/>
      <path d="M7.8925 12.3362L11.6638 16.1075C12.8354 17.279 12.8354 19.1785 11.6638 20.3501L11.1924 20.8215C8.9794 23.0345 5.3915 23.0344 3.1785 20.8215C0.9656 18.6085 0.9655 15.0206 3.1785 12.8076L3.6499 12.3362C4.8215 11.1646 6.721 11.1646 7.8925 12.3362Z" fill="currentColor" stroke="none"/>
      <path d="M20.5 2L16 6.5L22 6.5L17.5 11" fill="none"/>
    </svg>
  )
}
