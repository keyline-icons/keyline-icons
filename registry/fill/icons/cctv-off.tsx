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
      <path d="M13.3304 13.3304L6.4819 10.5634C5.348 10.1053 4.6057 9.0048 4.6057 7.7818C4.6057 7.3967 4.6798 7.0151 4.8241 6.658L5.3519 5.3519L13.3304 13.3304ZM8.6229 2.0022C8.6584 2.0009 8.6939 2.0003 8.7295 2.0003C9.1147 2.0003 9.4962 2.0745 9.8533 2.2187L17.2708 5.2156C18.0267 5.521 18.5216 6.2547 18.5216 7.07C18.5216 7.3267 18.4721 7.5811 18.3759 7.8192L17.1249 10.9155C16.9722 11.2935 16.6054 11.5409 16.1978 11.5409C15.9325 11.5409 15.6782 11.4355 15.4907 11.248L7.9513 3.7087C7.7638 3.5211 7.6584 3.2668 7.6584 3.0016C7.6584 2.4631 8.0848 2.0213 8.6229 2.0022Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M17.0742 8.3718L19.9192 8.1446C19.9457 8.1425 19.9722 8.1414 19.9988 8.1414C20.5511 8.1414 20.9988 8.5891 20.9988 9.1414C20.9988 9.2698 20.9741 9.397 20.926 9.516L19.516 13.0059C19.4385 13.1977 19.3034 13.3607 19.1294 13.4726M7.3201 9.8235L7.3201 17L3 17M3 13L3 21M2 2L22 22"/>
    </svg>
  )
}
