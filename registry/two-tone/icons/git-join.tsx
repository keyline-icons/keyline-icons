import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GitJoin({ size = 24, ...props }: IconProps) {
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
      <path d="M9 5C9 7.20914 7.20914 9 5 9C2.79086 9 1 7.20914 1 5C1 2.79086 2.79086 1 5 1C7.20914 1 9 2.79086 9 5ZM23 5C23 7.20914 21.2091 9 19 9C16.7909 9 15 7.20914 15 5C15 2.79086 16.7909 1 19 1C21.2091 1 23 2.79086 23 5ZM16 19C16 21.2091 14.2091 23 12 23C9.79086 23 8 21.2091 8 19C8 16.7909 9.79086 15 12 15C14.2091 15 16 16.7909 16 19Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 16V11M5 8C5 9.65685 6.34315 11 8 11H16C17.6569 11 19 9.65685 19 8"/>
      <path d="M12 16C13.6569 16 15 17.3431 15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19C9 17.3431 10.3431 16 12 16ZM5 2C6.65685 2 8 3.34315 8 5C8 6.65685 6.65685 8 5 8C3.34315 8 2 6.65685 2 5C2 3.34315 3.34315 2 5 2ZM19 2C20.6569 2 22 3.34315 22 5C22 6.65685 20.6569 8 19 8C17.3431 8 16 6.65685 16 5C16 3.34315 17.3431 2 19 2Z"/>
    </svg>
  )
}
