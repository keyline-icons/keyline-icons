import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CloudCog({ size = 24, ...props }: IconProps) {
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
      <path d="M14.6667 17C14.6667 18.4728 13.4728 19.6667 12 19.6667C10.5272 19.6667 9.3333 18.4728 9.3333 17C9.3333 15.5272 10.5272 14.3333 12 14.3333C13.4728 14.3333 14.6667 15.5272 14.6667 17ZM14.99 17L17 17M14.1142 19.1142L15.5355 20.5355M12 19.99L12 22M9.8858 19.1142L8.4645 20.5355M9.01 17L7 17M9.8858 14.8858L8.4645 13.4645M12 14.01L12 12M14.1142 14.8858L15.5355 13.4645M4.5 16.7528L4 16.4641C2.7624 15.7496 2 14.4291 2 13C2 10.7909 3.7909 9 6 9C6 5.6863 8.6863 3 12 3C15.3137 3 18 5.6863 18 9C20.2091 9 22 10.7909 22 13C22 14.4291 21.2376 15.7496 20 16.4641L19.5 16.7528" fill="none"/>
    </svg>
  )
}
