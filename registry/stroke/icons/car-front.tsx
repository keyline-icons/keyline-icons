import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CarFront({ size = 24, ...props }: IconProps) {
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
      <path d="M6 10L18 10C18.3506 10 18.6872 10.0602 19 10.1707C20.1652 10.5825 21 11.6937 21 13L21 18.0346C21 19.12 20.12 20 19.0346 20C18.1327 20 17.3465 19.3862 17.1278 18.5113L17 18L7 18L6.8722 18.5113C6.6535 19.3862 5.8673 20 4.9654 20C3.88 20 3 19.12 3 18.0346L3 13C3 11.6937 3.8348 10.5825 5 10.1707C5.3128 10.0602 5.6494 10 6 10ZM5 10.1707L5.3518 9L6.7199 5.8157C7.1932 4.714 8.2771 4 9.4762 4L14.5238 4C15.7229 4 16.8068 4.714 17.2801 5.8157L18.6482 9L19 10.1707M5.35177 9L3.5 9M18.6482 9L20.5 9M8 13.5L8 14.5M16 13.5L16 14.5" fill="none"/>
    </svg>
  )
}
