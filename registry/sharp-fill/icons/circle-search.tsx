import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleSearch({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1C18.075 1 23 5.925 23 12ZM13.308 14.722L15.828 17.243L17.243 15.828L14.722 13.308C15.125 12.653 15.357 11.882 15.357 11.057C15.357 8.682 13.432 6.757 11.057 6.757C9.87 6.757 8.794 7.24 8.017 8.017C7.24 8.794 6.757 9.87 6.757 11.057C6.757 13.432 8.682 15.357 11.057 15.357C11.882 15.357 12.653 15.125 13.308 14.722Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
