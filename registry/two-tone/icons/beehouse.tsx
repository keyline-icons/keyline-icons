import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Beehouse({ size = 24, ...props }: IconProps) {
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
      <path d="M3.8119 12.9538L2.8886 7.4144C2.8796 7.3601 2.875 7.3051 2.875 7.25C2.875 6.8411 3.1239 6.4734 3.5036 6.3215L10.8858 3.3686C11.601 3.0826 12.399 3.0826 13.1142 3.3686L20.4964 6.3215C20.8761 6.4734 21.125 6.8411 21.125 7.25C21.125 7.3051 21.1204 7.3601 21.1114 7.4144L19.2649 18.4932C19.0238 19.9398 17.7722 21 16.3057 21L7.6943 21C6.2278 21 4.9762 19.9398 4.7351 18.4932Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 8L11.2572 4.2971C11.734 4.1064 12.266 4.1064 12.7428 4.2971L22 8M12 4V2M4 8L5.7215 18.3288C5.8822 19.2932 6.7166 20 7.6943 20L16.3057 20C17.2834 20 18.1178 19.2932 18.2785 18.3288L20 8M10 10H14M12 20V22"/>
    </svg>
  )
}
