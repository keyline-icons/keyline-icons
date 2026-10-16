import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MapPinOff({ size = 24, ...props }: IconProps) {
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
      <path d="M17.4296 17.4296L12.7454 22.6667C12.5556 22.8788 12.2846 23 12 23C11.7154 23 11.4444 22.8788 11.2546 22.6667L5.2918 16C3.8159 14.3499 3 12.2138 3 10C3 8.0251 3.6361 6.1987 4.7146 4.7146ZM7.7668 3.5241C7.5387 3.296 7.4346 2.9719 7.4873 2.6536C7.54 2.3354 7.743 2.0621 8.0325 1.9197C9.2293 1.3307 10.576 1 12 1C16.9706 1 21 5.0294 21 10C21 11.3856 20.6804 12.7408 20.0793 13.9654C19.9371 14.2551 19.6638 14.4584 19.3454 14.5113C19.027 14.5642 18.7027 14.4602 18.4745 14.2319L14.2427 10C14.2427 8.7614 13.2386 7.7573 12 7.7573L7.7668 3.5241ZM12.8715 12.8715C12.5957 12.9551 12.3031 13 12 13C10.3431 13 9 11.6569 9 10C9 9.6969 9.0449 9.4043 9.1285 9.1285Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 2L22 22"/>
    </svg>
  )
}
