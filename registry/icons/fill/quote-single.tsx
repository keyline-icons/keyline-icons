import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function QuoteSingle({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M7.5 14.5C7.5 10.6868 9.4783 7.1467 12.7259 5.1483C12.8835 5.0513 13.065 5 13.25 5C13.8023 5 14.25 5.4477 14.25 6C14.25 6.2929 14.1216 6.571 13.8988 6.761C13.3725 7.2096 13.0694 7.8664 13.0694 8.5579C13.0694 9.4016 13.5194 10.1811 14.25 10.6029C15.6423 11.4067 16.5 12.8923 16.5 14.5C16.5 16.9853 14.4853 19 12 19C9.5147 19 7.5 16.9853 7.5 14.5Z" fill="currentColor"/>
    </svg>
  )
}
