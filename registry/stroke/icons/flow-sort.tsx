import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlowSort({ size = 24, ...props }: IconProps) {
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
      <path d="M2.94 10.304L10.94 5.304C11.5885 4.8987 12.4115 4.8987 13.06 5.304L21.06 10.304C22.3134 11.0873 22.3134 12.9127 21.06 13.696L13.06 18.696C12.4115 19.1013 11.5885 19.1013 10.94 18.696L2.94 13.696C1.6866 12.9127 1.6866 11.0873 2.94 10.304ZM2 12L22 12"/>
    </svg>
  )
}
