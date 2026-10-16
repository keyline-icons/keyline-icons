import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function VisionPro({ size = 24, ...props }: IconProps) {
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
      <path d="M7 6L17 6C20.3137 6 23 8.6863 23 12C23 15.3137 20.3137 18 17 18C15.6593 18 14.4078 17.3283 13.6667 16.2111C13.2961 15.6525 12.6703 15.3166 12 15.3166C11.3297 15.3166 10.7039 15.6525 10.3333 16.2111C9.5922 17.3283 8.3407 18 7 18C3.6863 18 1 15.3137 1 12C1 8.6863 3.6863 6 7 6Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7 7L17 7C19.7614 7 22 9.2386 22 12C22 14.7614 19.7614 17 17 17C15.9945 17 15.0558 16.4962 14.5 15.6583C13.9442 14.8204 13.0055 14.3166 12 14.3166C10.9945 14.3166 10.0558 14.8204 9.5 15.6583C8.9442 16.4962 8.0055 17 7 17C4.2386 17 2 14.7614 2 12C2 9.2386 4.2386 7 7 7Z"/>
    </svg>
  )
}
