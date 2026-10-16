import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CaretRight({ size = 24, ...props }: IconProps) {
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
      <path d="M17.7413 12.456L6.7841 18.9273C6.43652 19.1326 6 18.8787 6 18.4713L6 5.52868C6 5.12126 6.43651 4.86742 6.7841 5.0727L17.7413 11.544C18.0862 11.7477 18.0862 12.2523 17.7413 12.456Z" fill="currentColor" stroke="none"/>
      <path d="M17.7413 12.456L6.7841 18.9273C6.43652 19.1326 6 18.8787 6 18.4713L6 5.52868C6 5.12126 6.43651 4.86742 6.7841 5.0727L17.7413 11.544C18.0862 11.7477 18.0862 12.2523 17.7413 12.456Z"/>
    </svg>
  )
}
