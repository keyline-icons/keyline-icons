import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Snorkel({ size = 24, ...props }: IconProps) {
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
      <path d="M10 7L15 7C17.2092 7 19 8.7908 19 11C19 13.7614 16.7614 16 14 16L12.9142 16C12.3837 16 11.875 15.7892 11.5 15.4142L10 13.9L8.5 15.4142C8.125 15.7892 7.6163 16 7.0858 16L6 16C3.2386 16 1 13.7614 1 11C1 8.7908 2.7908 7 5 7Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22 5L22 14C22 16.7614 19.7614 19 17 19L10 19"/>
    </svg>
  )
}
