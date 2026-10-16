import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ExpandDashedUpRight({ size = 24, ...props }: IconProps) {
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
      <path d="M10 18L21 18M17.7071 21.2929L21 18L17.7071 14.7071M6 14L6 3M9.2929 6.2929L6 3L2.7071 6.2929"/>
      <path d="M12 3L15.3333 3M17.3333 3L21 3L21 6.6667M21 8.6667L21 12" strokeOpacity="0.4"/>
    </svg>
  )
}
