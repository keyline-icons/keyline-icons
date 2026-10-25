import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CarFrontOff({ size = 24, ...props }: IconProps) {
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
      <path d="M19 10.1707C18.6872 10.0602 18.3506 10 18 10L15 10M19 10.1707C20.1652 10.5825 21 11.6937 21 13L21 15.5M19 10.1707L18.6482 9M5 10.1707C3.8348 10.5825 3 11.6937 3 13L3 18.0346C3 19.12 3.88 20 4.9654 20C5.8673 20 6.6535 19.3862 6.8722 18.5113L7 18L17 18L17.1278 18.5113C17.3465 19.3862 18.1327 20 19.0346 20C19.3183 20 19.588 19.9399 19.8317 19.8317M5 10.1707C5.3128 10.0602 5.6494 10 6 10L10 10M5 10.1707L5.3518 9M9.4762 4L14.5238 4C15.7229 4 16.8068 4.714 17.2801 5.8157L18.6482 9M18.6482 9L20.5 9M5.3518 9L3.5 9M5.3518 9L6.4482 6.4482M8 14.5L8 13.5M2 2L6.4482 6.4482M6.4482 6.4482L10 10M10 10L19.8317 19.8317M19.8317 19.8317L22 22" fill="none"/>
    </svg>
  )
}
