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
      <path d="M6 2L18 2C20.2091 2 22 3.7909 22 6L22 14C22 16.2091 20.2091 18 18 18L7.4142 18L3.7071 21.7071C3.5196 21.8946 3.2652 22 3 22C2.4477 22 2 21.5523 2 21L2 6C2 3.7909 3.7909 2 6 2ZM13.3787 6.9184C13.1423 6.3669 12.6 6.0093 12 6.0093C11.4 6.0093 10.8577 6.3669 10.6213 6.9184L10.1104 8.1104L8.9184 8.6213C8.3669 8.8577 8.0093 9.4 8.0093 10C8.0093 10.6 8.3669 11.1423 8.9184 11.3787L10.1104 11.8896L10.6213 13.0816C10.8577 13.6331 11.4 13.9907 12 13.9907C12.6 13.9907 13.1423 13.6331 13.3787 13.0816L13.8896 11.8896L15.0816 11.3787C15.6331 11.1423 15.9907 10.6 15.9907 10C15.9907 9.4 15.6331 8.8577 15.0816 8.6213L13.8896 8.1104L13.3787 6.9184Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
