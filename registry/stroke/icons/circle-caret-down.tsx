import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleCaretDown({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z"/>
      <path d="M11.5301 16.7267L7.06842 8.78926C6.86937 8.43516 7.12844 8 7.5383 8H16.4617C16.8716 8 17.1306 8.43516 16.9316 8.78926L12.4699 16.7267C12.2651 17.0911 11.7349 17.0911 11.5301 16.7267Z"/>
    </svg>
  )
}
