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
      <path d="M19 13.38L21.6182 14.69C22.4649 15.11 22.9999 15.98 23 16.93V20.5C23 21.88 21.8807 23 20.5 23H3.5C2.1193 23 1 21.88 1 20.5V16.93C1.0001 15.98 1.5351 15.11 2.3818 14.69L5 13.38V13.02C5 12.06 5.4568 11.16 6.2295 10.59L11 7.11V5H10C9.4477 5 9 4.55 9 4C9 3.45 9.4477 3 10 3H11V2C11 1.45 11.4477 1 12 1C12.5523 1 13 1.45 13 2V3H14C14.5523 3 15 3.45 15 4C15 4.55 14.5523 5 14 5H13V7.11L17.7705 10.59C18.5432 11.16 19 12.06 19 13.02V13.38Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 22V14M6 22H3.5C2.6716 22 2 21.33 2 20.5V16.93C2 16.36 2.321 15.84 2.8292 15.59L6 14M6 22H10M6 14V13.02C6 12.38 6.3045 11.78 6.8197 11.4L12 7.61M10 22V18C10 16.9 10.8954 16 12 16C13.1046 16 14 16.9 14 18V22M10 22H14M12 7.61L17.1803 11.4C17.6955 11.78 18 12.38 18 13.02V14M12 7.61V4M18 14V22M18 14L21.1708 15.59C21.679 15.84 22 16.36 22 16.93V20.5C22 21.33 21.3284 22 20.5 22H18M18 22H14M12 2V4M12 4H10M12 4H14"/>
    </svg>
  )
}
