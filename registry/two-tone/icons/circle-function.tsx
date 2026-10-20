import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleFunction({ size = 24, ...props }: IconProps) {
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
      <path d="M22 12C22 17.5228 17.5228 22 12 22C6.4772 22 2 17.5228 2 12C2 6.4772 6.4772 2 12 2C17.5228 2 22 6.4772 22 12ZM8.1088 16.4893C8.4234 16.8174 8.8582 17.0029 9.3127 17.0029C10.0573 17.0029 10.7116 16.5094 10.9161 15.7934L13.0839 8.2066C13.2884 7.4906 13.9427 6.9971 14.6873 6.9971C15.1418 6.9971 15.5766 7.1826 15.8912 7.5107M10.0544 10.8882L14.5015 10.8882" fill="none"/>
    </svg>
  )
}
