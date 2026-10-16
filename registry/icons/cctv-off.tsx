import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CctvOff({ size = 24, ...props }: IconProps) {
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
      <path d="M11.5207 11.5207L6.8565 9.6362C6.1005 9.3308 5.6057 8.5971 5.6057 7.7818C5.6057 7.5251 5.6551 7.2707 5.7513 7.0326L6.12 6.12M8.6584 3.0016C8.6821 3.0007 8.7058 3.0003 8.7295 3.0003C8.9863 3.0003 9.2406 3.0497 9.4787 3.1459L16.8962 6.1428C17.2741 6.2955 17.5216 6.6623 17.5216 7.07C17.5216 7.1984 17.4969 7.3255 17.4488 7.4446L16.1978 10.5409M17.0742 8.3718L19.9192 8.1446C19.9457 8.1425 19.9722 8.1414 19.9988 8.1414C20.5511 8.1414 20.9988 8.5891 20.9988 9.1414C20.9988 9.2698 20.9741 9.397 20.926 9.516L19.516 13.0059C19.4385 13.1977 19.3034 13.3607 19.1294 13.4726M7.3201 9.8235L7.3201 17L3 17M3 13L3 21M2 2L22 22"/>
    </svg>
  )
}
