import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Kerning({ size = 24, ...props }: IconProps) {
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
      <path d="M1.928 14.6273L7 2L12.072 14.6273M4.188 9L9.812 9M12.9408 1.3389L17.5 13.9958L22.0592 1.3389M7 20L17 20M9.2929 17.7071L7 20L9.2929 22.2929M14.7071 17.7071L17 20L14.7071 22.2929" fill="none"/>
    </svg>
  )
}
