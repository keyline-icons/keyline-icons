import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Delete({ size = 24, ...props }: IconProps) {
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
      <path d="M1.5281 10.646L7.6698 3.969C8.2379 3.3514 9.0386 3 9.8778 3L19 3C21.2091 3 23 4.7909 23 7L23 17C23 19.2091 21.2091 21 19 21L9.8778 21C9.0386 21 8.2379 20.6486 7.6698 20.031L1.5281 13.354C1.1885 12.9848 1 12.5016 1 12C1 11.4984 1.1885 11.0152 1.5281 10.646ZM11.7071 8.2929C11.5196 8.1054 11.2652 8 11 8C10.4477 8 10 8.4477 10 9C10 9.2652 10.1054 9.5196 10.2929 9.7071L12.5858 12L10.2929 14.2929C10.1054 14.4804 10 14.7348 10 15C10 15.5523 10.4477 16 11 16C11.2652 16 11.5196 15.8946 11.7071 15.7071L14 13.4142L16.2929 15.7071C16.4804 15.8946 16.7348 16 17 16C17.5523 16 18 15.5523 18 15C18 14.7348 17.8946 14.4804 17.7071 14.2929L15.4142 12L17.7071 9.7071C17.8946 9.5196 18 9.2652 18 9C18 8.4477 17.5523 8 17 8C16.7348 8 16.4804 8.1054 16.2929 8.2929L14 10.5858L11.7071 8.2929Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
