import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CalendarStar({ size = 24, ...props }: IconProps) {
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
      <path d="M9 21L3 21L3 5L21 5L21 11M6 11L10.627 11M8 2L8 8M16 2L16 8M15.7693 11.6536C15.8082 11.5606 15.8992 11.5 16 11.5C16.1009 11.5 16.1918 11.5606 16.2307 11.6536L17.4938 14.678L20.7699 14.9395C20.8998 14.9499 21 15.0584 21 15.1887C21 15.2619 20.9679 15.3314 20.9123 15.3789L18.417 17.5076L19.1797 20.6918C19.1842 20.7108 19.1865 20.7304 19.1865 20.75C19.1865 20.8881 19.0746 21 18.9365 21C18.8907 21 18.8458 20.9874 18.8066 20.9636L16 19.2564L13.1934 20.9636C13.1543 20.9874 13.1093 21 13.0635 21C12.9254 21 12.8135 20.8881 12.8135 20.75C12.8135 20.7304 12.8158 20.7108 12.8204 20.6918L13.5831 17.5076L11.0878 15.3789C11.0321 15.3314 11 15.2619 11 15.1887C11 15.0584 11.1002 14.9499 11.2301 14.9395L14.5062 14.678Z"/>
    </svg>
  )
}
