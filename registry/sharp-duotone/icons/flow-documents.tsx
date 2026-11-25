import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlowDocuments({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2 13L2 5L16 5" strokeOpacity="0.4"/>
      <path d="M14 8L22 8C22.5523 8 23 8.4477 23 9L23 16.536C23 17.0883 22.5523 17.536 22 17.536C21.8245 17.536 21.652 17.4898 21.5 17.402L20 16.5359C19.3919 16.1848 18.7022 16 18 16C16.741 16 15.5554 16.5928 14.8 17.6C13.6668 19.1108 11.8886 20 10 20C8.1114 20 6.3332 19.1108 5.2 17.6C5.0702 17.4269 5 17.2164 5 17L5 9C5 8.4477 5.4477 8 6 8Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
