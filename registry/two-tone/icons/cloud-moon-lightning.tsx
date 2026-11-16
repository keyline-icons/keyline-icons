import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CloudMoonLightning({ size = 24, ...props }: IconProps) {
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
      <path d="M8.5 18.598C7.5718 18.062 7 17.072 7 16C7 14.343 8.3431 13 10 13C10 10.515 12.0147 8.5 14.5 8.5C16.9853 8.5 19 10.515 19 13C20.6569 13 22 14.343 22 16C22 17.072 21.4282 18.062 20.5 18.598" strokeOpacity="0.4"/>
      <path d="M3.7192 12.904C2.6137 11.704 2 10.132 2 8.5C2 4.91 4.9101 2 8.5 2C7.844 2.82 7.4866 3.839 7.4866 4.889C7.4866 5.747 7.7253 6.588 8.1761 7.318M15.5 17.5L13.25 20H16.25L14 22"/>
    </svg>
  )
}
