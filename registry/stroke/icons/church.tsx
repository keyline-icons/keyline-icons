import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Church({ size = 24, ...props }: IconProps) {
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
      <path d="M6 22V14M6 22H3.5C2.6716 22 2 21.33 2 20.5V16.93C2 16.36 2.321 15.84 2.8292 15.59L6 14M6 22H10M6 14V13.02C6 12.38 6.3045 11.78 6.8197 11.4L12 7.61M10 22V18C10 16.9 10.8954 16 12 16C13.1046 16 14 16.9 14 18V22M10 22H14M12 7.61L17.1803 11.4C17.6955 11.78 18 12.38 18 13.02V14M12 7.61V4M18 14V22M18 14L21.1708 15.59C21.679 15.84 22 16.36 22 16.93V20.5C22 21.33 21.3284 22 20.5 22H18M18 22H14M12 2V4M12 4H10M12 4H14"/>
    </svg>
  )
}
