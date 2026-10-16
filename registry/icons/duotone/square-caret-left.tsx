import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareCaretLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M22 6C22 3.79086 20.2091 2 18 2H6C3.79086 2 2 3.79086 2 6V18C2 20.2091 3.79086 22 6 22H18C20.2091 22 22 20.2091 22 18V6Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7.77326 12.4699L15.7107 16.9316C16.0648 17.1306 16.5 16.8716 16.5 16.4617V7.5383C16.5 7.12844 16.0648 6.86937 15.7107 7.06842L7.77326 11.5301C7.40891 11.7349 7.40891 12.2651 7.77326 12.4699Z"/>
    </svg>
  )
}
