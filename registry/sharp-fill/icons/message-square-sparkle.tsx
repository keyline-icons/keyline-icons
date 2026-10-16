import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageSquareSparkle({ size = 24, ...props }: IconProps) {
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
      <path d="M3 2L21 2C21.5523 2 22 2.4477 22 3L22 17C22 17.5523 21.5523 18 21 18L7.4142 18L3.7071 21.7071C3.5196 21.8946 3.2652 22 3 22C2.4477 22 2 21.5523 2 21L2 3C2 2.4477 2.4477 2 3 2ZM12.8554 6.4913C12.6742 6.1921 12.3498 6.0093 12 6.0093C11.6502 6.0093 11.3258 6.1921 11.1446 6.4913L10.1439 8.1439L8.4913 9.1446C8.1921 9.3258 8.0093 9.6502 8.0093 10C8.0093 10.3498 8.1921 10.6742 8.4913 10.8554L10.1439 11.8561L11.1446 13.5087C11.3258 13.8079 11.6502 13.9907 12 13.9907C12.3498 13.9907 12.6742 13.8079 12.8554 13.5087L13.8561 11.8561L15.5087 10.8554C15.8079 10.6742 15.9907 10.3498 15.9907 10C15.9907 9.6502 15.8079 9.3258 15.5087 9.1446L13.8561 8.1439L12.8554 6.4913Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
