import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BracketArrowDown({ size = 24, ...props }: IconProps) {
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
      <path d="M4 11.1093V6C4 3.79086 5.79086 2 8 2H16C18.2091 2 20 3.79086 20 6V11.1093M12 21.2307V11.1093M6.5 16.17L11.6314 21.8359C11.8296 22.0547 12.1704 22.0547 12.3686 21.8359L17.5 16.17"/>
    </svg>
  )
}
